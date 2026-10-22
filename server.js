const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// API Nhận lệnh từ Frontend Web của bạn
app.post('/api/action', async (req, res) => {
    const { token, action, channelId } = req.body;

    if (!token) {
        return res.status(400).json({ success: false, message: 'Thiếu Discord Token!' });
    }

    console.log(`Nhận lệnh [${action}] với token tài khoản...`);

    try {
        if (action === 'treo_voice') {
            // Logic kết nối Gateway / Voice Channel thực tế sẽ xử lý ở đây
            // Do Discord giới hạn self-bot voice qua API thuần, cần các thư viện như discord.js-selfbot
            return res.json({ success: true, message: `Đang giả lập treo voice tại kênh: ${channelId || 'Chưa rõ'}` });
        } 
        
        else if (action === 'treo_game') {
            return res.json({ success: true, message: 'Đã kích hoạt giả lập treo game qua Gateway!' });
        }

        else if (action === 'stop') {
            return res.json({ success: true, message: 'Đã dừng toàn bộ tiến trình trên server!' });
        }

        res.status(400).json({ success: false, message: 'Hành động không hợp lệ!' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server Backend đang chạy trên cổng ${PORT}`);
});
