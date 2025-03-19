import { requestModel } from "../Config/db1.js";

// Send Request
export const sendRequest = async (req, res) => {
    const { prId, id } = req.body;

    try {
        const newRequest = await requestModel.create({ prId, id });
        res.status(201).json({ message: "Request sent successfully", data: newRequest });
    } catch (error) {
        console.error(" Error sending request:", error);
        res.status(500).json({ error: "Failed to send request" });
    }
};

// Accept Request
export const acceptRequest = async (req, res) => {
    const { reqId } = req.params;

    try {
        const request = await requestModel.findByPk(reqId);
        if (!request) return res.status(404).json({ error: "Request not found" });

        request.status = 'Accepted';
        await request.save();

        res.json({ message: "Request accepted successfully", data: request });
    } catch (error) {
        console.error(" Error accepting request:", error);
        res.status(500).json({ error: "Failed to accept request" });
    }
};

//  Reject Request
export const rejectRequest = async (req, res) => {
    const { reqId } = req.params;

    try {
        const request = await requestModel.findByPk(reqId);
        if (!request) return res.status(404).json({ error: "Request not found" });

        request.status = 'Rejected';
        await request.save();

        res.json({ message: "Request rejected successfully", data: request });
    } catch (error) {
        console.error(" Error rejecting request:", error);
        res.status(500).json({ error: "Failed to reject request" });
    }
};
