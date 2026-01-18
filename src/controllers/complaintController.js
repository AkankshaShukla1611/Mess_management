const Complaint = require("../models/Complaint");
const asyncHandler = require("../utils/asyncHandler");


// Student creates complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, isAnonymous } = req.body;

    const complaint = await Complaint.create({
      title,
      description,
      isAnonymous,
      student: isAnonymous ? null : req.user.id,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      student: req.user.id,
    });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllComplaints = asyncHandler(async (req, res) => {
  // 1️⃣ Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // 2️⃣ Filtering
  const status = req.query.status;
  const filter = status ? { status } : {};

  // 3️⃣ Count total documents
  const total = await Complaint.countDocuments(filter);

  // 4️⃣ Fetch complaints
  const complaints = await Complaint.find(filter)
    .populate("student", "name email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  // 5️⃣ Response
  res.json({
    success: true,
    total,
    page,
    pages: Math.ceil(total / limit),
    complaints,
  });
});



exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getComplaintSummary = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();

    const pending = await Complaint.countDocuments({ status: "pending" });
    const inProgress = await Complaint.countDocuments({ status: "in-progress" });
    const resolved = await Complaint.countDocuments({ status: "resolved" });

    res.json({
      total,
      pending,
      inProgress,
      resolved,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

