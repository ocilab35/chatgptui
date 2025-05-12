import express from "express";
import Chat from "../models/Chat.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create a new chat
router.post("/", auth, async (req, res) => {
  try {
    const chat = new Chat({
      userId: req.user.id,
      title: req.body.title || "New Chat",
      messages: [],
    });
    await chat.save();
    res.status(201).send(chat);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all chats for a user
router.get("/", auth, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.id })
      .sort({ updatedAt: -1 })
      .select("_id title updatedAt");
    res.send(chats);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific chat
router.get("/:id", auth, async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!chat) return res.status(404).send();
    res.send(chat);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add a message to a chat
router.post("/:id/messages", auth, async (req, res) => {
  try {
    const chat = await Chat.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        $push: {
          messages: {
            text: req.body.text,
            sender: req.body.sender,
            images: req.body.images || [],
            time: new Date(),
          },
        },
        $set: { updatedAt: new Date() },
      },
      { new: true }
    );
    if (!chat) return res.status(404).send();
    res.send(chat);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update chat title
router.patch("/:id/title", auth, async (req, res) => {
  try {
    const chat = await Chat.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: { title: req.body.title, updatedAt: new Date() } },
      { new: true }
    );
    if (!chat) return res.status(404).send();
    res.send(chat);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a chat
router.delete("/:id", auth, async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!chat) return res.status(404).send();
    res.send(chat);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
