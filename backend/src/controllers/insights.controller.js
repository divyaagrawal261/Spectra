import mongoose from "mongoose";
import Event from "../models/Event.js";

const buildMatch = (req, { includeEventName }) => {
  const { projectId, eventName: eventNameParam } = req.params;
  const {
    eventName: eventNameQuery,
    page,
    start,
    end,
    from,
    to
  } = req.query;

  const match = {
    projectId: new mongoose.Types.ObjectId(projectId)
  };

  if (includeEventName) {
    const resolvedEventName = eventNameParam || eventNameQuery;
    if (resolvedEventName) {
      match.eventName = resolvedEventName;
    }
  }

  if (page) {
    match.page = page;
  }

  const startValue = start || from;
  const endValue = end || to;

  if (startValue || endValue) {
    match.timestamp = {};

    if (startValue) {
      const startDate = new Date(startValue);
      if (Number.isNaN(startDate.getTime())) {
        return { error: "Invalid start timestamp." };
      }
      match.timestamp.$gte = startDate;
    }

    if (endValue) {
      const endDate = new Date(endValue);
      if (Number.isNaN(endDate.getTime())) {
        return { error: "Invalid end timestamp." };
      }
      match.timestamp.$lte = endDate;
    }
  }

  return { match };
};


/**
 * Events grouped by day
 */
export const eventsOverTime = async (req, res) => {
  const { error, match } = buildMatch(req, { includeEventName: true });
  if (error) {
    return res.status(400).json({ error });
  }

  const data = await Event.aggregate([
    {
      $match: match
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$timestamp"
          }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  res.json(data);
};


/**
 * Top events across project
 */
export const topEvents = async (req, res) => {
  const { error, match } = buildMatch(req, { includeEventName: true });
  if (error) {
    return res.status(400).json({ error });
  }

  const data = await Event.aggregate([
    {
      $match: match
    },
    {
      $group: {
        _id: "$eventName",
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);

  res.json(data);
};


/**
 * Event count per page
 */
export const eventByPage = async (req, res) => {
  const { error, match } = buildMatch(req, { includeEventName: true });
  if (error) {
    return res.status(400).json({ error });
  }

  const data = await Event.aggregate([
    { $match: match },

    // Extract pathname from full URL
    {
      $addFields: {
        pathname: {
          $arrayElemAt: [
            { $split: ["$page", "/"] },
            3
          ]
        }
      }
    },

    {
      $group: {
        _id: {
          $concat: ["/", "$pathname"]
        },
        count: { $sum: 1 }
      }
    },

    { $sort: { count: -1 } }
  ]);

  res.json(data);
};

/**
 * Funnel analysis
 * Body: { steps: ["event1", "event2", "event3"] }
 */
export const funnelStats = async (req, res) => {
  const { projectId } = req.params;
  const { steps } = req.body;
  const { error, match } = buildMatch(req, { includeEventName: false });
  if (error) {
    return res.status(400).json({ error });
  }

  match.eventName = { $in: steps };

  const sessions = await Event.aggregate([
    {
      $match: {
        ...match,
        projectId: new mongoose.Types.ObjectId(projectId)
      }
    },
    {
      $sort: { timestamp: 1 }
    },
    {
      $group: {
        _id: "$sessionId",
        events: { $push: "$eventName" }
      }
    }
  ]);

  const funnel = steps.map((step, index) => ({
    step,
    users: sessions.filter(s =>
      steps
        .slice(0, index + 1)
        .every((ev, i) => s.events[i] === ev)
    ).length
  }));

  res.json(funnel);
};

export const eventOverview = async (req, res) => {
  const { error, match } = buildMatch(req, { includeEventName: true });
  if (error) {
    return res.status(400).json({ error });
  }

  const total = await Event.countDocuments(match);

  const uniqueSessions = await Event.distinct("sessionId", match);

  res.json({
    projectId: req.params.projectId,
    event: match.eventName || null,
    totalEvents: total,
    uniqueUsers: uniqueSessions.length
  });
};

