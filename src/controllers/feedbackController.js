const Feedback = require("../models/Feedback");

// Student gives feedback
exports.addFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const today = new Date().setHours(0, 0, 0, 0);

    const feedback = await Feedback.create({
      student: req.user.id,
      date: new Date(today),
      rating,
      comment,
    });

    res.status(201).json(feedback);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Feedback already submitted for today",
      });
    }
    res.status(500).json({ error: error.message });
  }
};
exports.getMyFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({
      student: req.user.id,
    });

    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("student", "name email");

    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getFeedbackStats = async (req, res) => {
  try {
    const stats = await Feedback.aggregate([
      {
        $group: {
          _id: "$date",
          averageRating: { $avg: "$rating" },
          totalFeedbacks: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
