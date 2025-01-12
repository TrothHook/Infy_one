module.exports.login = async (req, res) => {
  try {
    let {username, password} = req.body || null || undefined;
    if(!username || !password){
        return res.status(400).json({success:false, message: "Username or Password is missing"})
    }
    
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};