const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        // ตรวจสอบว่าอีเมลและรหัสผ่านไม่เป็นค่าว่าง
        if (!email || !password || !username) {
            return res.status(400).json({ error: 'Invalid input: All fields are required' });
        }

        // ถ้ารหัสผ่านใหม่ต้องแฮช
        
        
        let hashedPassword = password;
        // if (password !== UserData.password) {
        //     hashedPassword = await bcrypt.hash(password, 10);  // ทำการแฮชรหัสผ่านใหม่
        // }
        hashedPassword = await bcrypt.hash(password, 10);  // ทำการแฮชรหัสผ่านใหม่
        // หาผู้ใช้ตามอีเมลและอัปเดตข้อมูล
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            {
                email: email,
                password: hashedPassword,  // แฮชรหัสผ่านก่อนเก็บ
                username: username
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};
