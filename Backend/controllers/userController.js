import Job from "../models/Jobs.js"
import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"
import { v2 as cloudinary } from "cloudinary"
import { getAuth } from '@clerk/express'

// Get User Data
export const getUserData = async (req, res) => {
    try {
        const { isAuthenticated, userId } = getAuth(req)

        if (!isAuthenticated || !userId) {
            return res.status(401).json({ success: false, message: 'Not authenticated' })
        }

        const user = await User.findById(userId)

        if (!user) {
            return res.json({ success: false, message: 'User Not Found' })
        }

        res.json({ success: true, user })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Deliver the current user's resume with inline PDF headers for browser preview.
export const getUserResume = async (req, res) => {
    try {
        const { isAuthenticated, userId } = getAuth(req)
        if (!isAuthenticated || !userId) {
            return res.status(401).json({ success: false, message: 'Not authenticated' })
        }

        const user = await User.findById(userId)
        if (!user?.resume) {
            return res.status(404).json({ success: false, message: 'Resume not found' })
        }

        const resumeUrl = new URL(user.resume)
        if (resumeUrl.protocol !== 'https:' || resumeUrl.hostname !== 'res.cloudinary.com') {
            return res.status(400).json({ success: false, message: 'Invalid resume URL' })
        }

        const cloudinaryResponse = await fetch(resumeUrl)
        if (!cloudinaryResponse.ok) {
            return res.status(502).json({ success: false, message: 'Could not retrieve resume from Cloudinary' })
        }

        const pdf = Buffer.from(await cloudinaryResponse.arrayBuffer())
        if (pdf.subarray(0, 5).toString() !== '%PDF-') {
            return res.status(502).json({ success: false, message: 'Cloudinary did not return a PDF file' })
        }

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename="resume.pdf"',
            'Content-Length': pdf.length,
            'Cache-Control': 'private, no-store'
        })
        return res.send(pdf)
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}


// Apply For Job
export const applyForJob = async (req, res) => {

    const { jobId } = req.body

    try {
        const { isAuthenticated, userId } = getAuth(req)
        if (!isAuthenticated || !userId) {
            return res.status(401).json({ success: false, message: 'Not authenticated' })
        }

        const isAlreadyApplied = await JobApplication.find({ jobId, userId })

        if (isAlreadyApplied.length > 0) {
            return res.json({ success: false, message: 'Already Applied' })
        }

        const jobData = await Job.findById(jobId)

        if (!jobData) {
            return res.json({ success: false, message: 'Job Not Found' })
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })

        res.json({ success: true, message: 'Applied Successfully' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Get User Applied Applications Data
export const getUserJobApplications = async (req, res) => {

    try {
        const { isAuthenticated, userId } = getAuth(req)
        if (!isAuthenticated || !userId) {
            return res.status(401).json({ success: false, message: 'Not authenticated' })
        }

        const applications = await JobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec()

        if (!applications) {
            return res.json({ success: false, message: 'No job applications found for this user.' })
        }

        return res.json({ success: true, applications })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Update User Resume
export const updateUserResume = async (req, res) => {
    try {
        const { isAuthenticated, userId } = getAuth(req)
        if (!isAuthenticated || !userId) {
            return res.status(401).json({ success: false, message: 'Not authenticated' })
        }

        const resumeFile = req.file
        if (!resumeFile) {
            return res.status(400).json({ success: false, message: 'Please select a resume file' })
        }

        const userData = await User.findById(userId)
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User profile not found' })
        }

        // Store PDFs as image assets so Cloudinary can deliver them as browser-viewable PDFs.
        const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
            resource_type: 'image',
            format: 'pdf'
        })
        userData.resume = resumeUpload.secure_url

        await userData.save()

        return res.json({ success: true, message: 'Resume Updated' })

    } catch (error) {

        res.json({ success: false, message: error.message })

    }
}
