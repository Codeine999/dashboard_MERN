import User from "../models/User.js";
import fs from 'fs';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    res.status(500).json({ message: ' SOMETHING WRONG ' }, error);
  }
};


export const getUserByEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById( id );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ 
      username: user.username,
      firstname: user.firstname,
      lastname : user.lastname,
      email: user.email, 
      role: user.role, 
      file: user.file
    });
      
  } catch (error) {
    res.status(500).json({ message: ' SOMETHING WRONG ' }, error);
  }
};


export const getAllAdmin = async (req, res) => {
  try {
    const adminUsers = await User.find({ role: { $in: ["admin", "editor"] }})
      .select('-password')
      .exec();

    if (!adminUsers || adminUsers.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    adminUsers.forEach((user) => {
      if (user.file) {
        const _url = req.protocol + '://' + req.get('host');
        user.avatarUrl = _url + '/' + user.file.replace('image/', '');
      }
    });

    res.json(adminUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ' SOMETHING WRONG ' }, error);
  }
};


export const changeRole = async (req, res) => {
  try {
    const { id, role } = req.body.data
    console.log(id, role)

    const user = await User.findByIdAndUpdate({_id:id},{ role: role}, { new: true})
    .select('-password')
    .exec();
    res.send(user)
  } catch (error) {
    res.status(500).json({ message: ' SOMETHING WRONG ' }, error);
  }
}


export const currentUser = async (req, res) => {
  try {
    
    const user = await User.findOne({ firstname: req.user.firstname })
    .select('-password')
    .exec();
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const _url = req.protocol + '://' + req.get('host');
    const avatarUrl = _url + '/' + user.file.replace('image/', '');
    user.avatarUrl = avatarUrl;
    
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ' SOMETHING WRONG ' }, error);
  }
}


export const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, firstname, lastname, email, role, } = req.body;
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found'});
    }

    user.username = username;
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.role = role;

    if (req.file) {
      user.img = req.file.filename;
    }

    await user.save();
    res.status(200).json({ message: 'Users updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ' SOMETHING WRONG ' }, error);
  }
};


export const deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOneAndDelete({ _id: id }).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.file) {
      const imagePath = `./${user.file}`;
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image:', err);
        } else {
          console.log('Image deleted successfully');
        }
      });
    }
    res.send('User deleted successfully');
  } catch (error) {
    res.status(500).json({ message: ' SOMETHING WRONG ' }, error);
  }
};
  
  

