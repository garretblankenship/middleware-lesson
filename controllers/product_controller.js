const products = [];

async function index(req, res, next) {
    return next(new HttpError(401, "You are not logged in"));
    console.log("here");
    res.json(products);
}

async function show(req, res) {
    let { id } = req.params;
    res.json(products[id]);
}

async function create(req, res) {
    const { name, categories, price } = req.body;
    products.push({ name, categories, price });

    res.json(products[products.length - 1]);
}

module.exports = {
    index,
    show,
    create
}