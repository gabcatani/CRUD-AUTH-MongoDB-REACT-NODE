class HelloController {
    
    async index(req, res) {
        try {
            return res.json({ message: "Hello World!"});

        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error."})
        }
    }
}

export default new HelloController();