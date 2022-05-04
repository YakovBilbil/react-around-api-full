export default createCard = (req, res) => Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id // employing req.user in a handler
});