import FrontEnd from "../models/FrontEnd.js";
import fs from 'fs';
import multer from 'multer';


const { Header, MainText } = FrontEnd;


export const HeaderCrud = {
  createHeader: async (req, res) => {
    try {

      const { text1, text2, button } = req.body;
      await Header.deleteMany({});
      const newHeader = new Header({
        file: req.file.path,
        text1,
        text2,
        button
      });
      await newHeader.save();
      res.status(201).json('Already Created!');
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ' SOMETHING WRONG ' }, error);
    }
  },


  getHeader: async (req, res) => {
    try {
      const Headers = await Header.find();
      const _url = req.protocol + '://' + req.get('host');
      // console.log('_url = ', _url)
      // console.log('Headers', Headers[0].file)

      const _resData = Headers.flatMap(v => {
        return {
          _id: v._id,
          text1: v.text1,
          text2: v.text2,
          button: v.button,
          file: v.file,
          url: _url + '/header/' + v.file
        }
      })

      return res.json(_resData);

    } catch (error) {
      res.status(500).json({ message: ' SOMETHING WRONG ' }, error);
    }
  },


  getHeaderByID: async (req, res) => {
    try {
      const { id } = req.params;
      const header = await Header.findById(id);

      if (!header) {
        return res.status(404).send("Header not found");
      }

      res.status(200).json(header);
    } catch (error) {
      res.status(500).send("Server error");
    }
  },

  updateHeader: async (req, res) => {
    try {
      const id = req.params.id;
      var newData = req.body;

      if (typeof req.file !== 'undefined') {
        newData.file = req.file.filename
        await fs.unlink('./image/header/' + newData.fileold, (err) => {
          if (err) {
            console.log(err)
          } else {
            console.log('Edit success')
          }
        })
      }

      const updated = await Header.findOneAndUpdate({ _id: id }, newData, { new: true }).exec();
      res.send(updated);
    } catch (error) {
      res.status(500).json({ message: ' SOMETHING WRONG ' }, error);
    }

  }
};
