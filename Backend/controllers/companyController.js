import bcrypt from "bcrypt"
import Company from "../models/Company.js"

import {v2 as cloudinary} from "cloudinary"
import generateToken from "../utils/generateToken.js"
import Job from "../models/Jobs.js"
import JobApplication from "../models/JobApplication.js"

export const fun=(req,res)=>{
    return res.send("controller")

}
// Register a new company
export const registerCompany = async (req, res) => {

    const { name, email, password } = req.body;

    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        return res.json({
            success: false,
            message: "Missing Details"
        });
    }

    try {

        const companyExists = await Company.findOne({ email });

        if (companyExists) {
            return res.json({
                success: false,
                message: "Company already registered"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        console.log("Starting Cloudinary upload...");
        console.log("Image path:", imageFile.path);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path);

        console.log("Cloudinary upload successful!");
        console.log("Image URL:", imageUpload.secure_url);

        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        });

        res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        });

    } catch (error) {

        console.log("========== CLOUDINARY/REGISTER ERROR ==========");
        console.log("FULL ERROR:", error);
        console.log("ERROR MESSAGE:", error.message);
        console.log("HTTP CODE:", error.http_code);
        console.log("===============================================");

        res.json({
            success: false,
            message: error.message
        });
    }
};

// Login Company
export const loginCompany = async (req, res) => {

    const { email, password } = req.body

    try {

        const company = await Company.findOne({ email })

        if (!company) {
            return res.json({
                success: false,
                message: 'Invalid email or password'
            })
        }

        if (await bcrypt.compare(password, company.password)) {

            return res.json({
                success: true,
                company: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            })

        } else {

            return res.json({
                success: false,
                message: 'Invalid email or password'
            })
        }

    } catch (error) {

        return res.json({
            success: false,
            message: error.message
        })
    }
}

// Get Company Data
export const getCompanyData = async (req, res) => {

    try {

        const company = req.company

        res.json({ success: true, company })

    } catch (error) {
        res.json({
            success: false, message: error.message
        })
    }

}


//post jobs by company
export const postJob = async (req, res) => {

    const { title, description, location, salary, level, category } = req.body

    const companyId = req.company._id

    try {

        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date: Date.now(),
            level,
            category
        })

        await newJob.save()

        res.json({ success: true, newJob })

    } catch (error) {

        res.json({ success: false, message: error.message })

    }


}

// Get Company Posted Jobs
export const getCompanyPostedJobs = async (req, res) => {
    try {

        const companyId = req.company._id

        const jobs = await Job.find({ companyId })

        // Adding No. of applicants info in data
        const jobsData = await Promise.all(jobs.map(async (job) => {
            const applicants = await JobApplication.find({ jobId: job._id });
            return { ...job.toObject(), applicants: applicants.length }
        }))

        res.json({ success: true, jobsData })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Change Job Visiblity
export const changeVisiblity = async (req, res) => {
    try {

        const { id } = req.body

        const companyId = req.company._id

        const job = await Job.findById(id)

        if (companyId.toString() === job.companyId.toString()) {
            job.visible = !job.visible
        }

        await job.save()

        res.json({ success: true, job })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}