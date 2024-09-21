module.exports = (fn) => { //fn is an async function
    return (req, res, next)=>{ 
        fn(req, res, next).catch((err)=>{
            next(err);
        })
    }
};
