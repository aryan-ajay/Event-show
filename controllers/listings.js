const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");



module.exports.index = async (req, res)=> {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

//New Route
module.exports.renderNewForm = (req, res)=> {
    res.render("listings/new.ejs");
};

//show routs
module.exports.showListing = async (req, res)=> {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews", 
            populate:{
               path: "author"
            },
        })
        .populate("owner");
    if(!listing) {
        req.flash("error", "Listings you requested for does not exits!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

// create routs
module.exports.createListing = async (req, res, next)=> {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New listings created! ");
    res.redirect("/listings");
   next()
};

// Edit Route
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listings you requested for does not exits!");
        res.redirect("/listings");
    }

    let orginalImageUrl = listing.image.url;
    console.log("step 1", orginalImageUrl);
    orginalImageUrl = orginalImageUrl.replace("/upload", "/upload/h_250,w_250");
    console.log("step 1", orginalImageUrl);
    res.render("listings/edit.ejs", { listing, orginalImageUrl }); 
};

// Upadte Route
module.exports.updateListing = async (req, res)=> {
    if(!req.body.listing) {
        throw new ExpressError(400, "Send valid data")
    }
    let { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    
    if(typeof req.file !== 'undefined' ){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }

    req.flash("success", "Listings updated! ");
    res.redirect(`/listings/${id}`)
}

//delete route
module.exports.destroyListing = async (req, res)=> {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listings deleted! ");
    res.redirect("/listings");
};
