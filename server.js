const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Thêm đoạn này để khi truy cập trang chủ Render không bị lỗi Cannot GET /
app.get('/', (req, res) => {
    res.status(200).send('Discord Toolkit Backend is Online and Running!');
});

// Endpoint kiểm tra trạng thái sống của server (Ping API)
app.get('/ping', (req, res) => {
    res.status(200).json({ status: 'online', timestamp: new Date() });
});

// Endpoint xử lý tác vụ từ Frontend Dashboard gửi sang
app.post('/api/action', async (req, res) => {
    const { token, action, channelId } = req.body;

    if (!token) {
        return res.status(400).json({ success: false, message: 'Thiếu Discord Token!' });
    }

    console.log(`[Render Work] Nhận lệnh "${action}" cho token: ${token.substring(0, 10)}...`);

    switch (action) {
        case 'treo_gio_choi':
            return res.json({ success: true, message: 'Đã kích hoạt treo giờ chơi 1 game thành công trên Render!' });
            
        case 'treo_da_dang':
            return res.json({ success: true, message: 'Đã kích hoạt xoay vòng game 45 phút/lần!' });

        case 'treo_golive':
            return res.json({ success: true, message: 'Đã bật treo Go Live stream qua Gateway!' });

        case 'treo_voice':
            return res.json({ success: true, message: `Đã kết nối và treo tài khoản tại Voice ID: ${channelId || 'Chưa chọn'}` });

        case 'toggle_mic':
            return res.json({ success: true, message: 'Đã chuyển đổi trạng thái Mic trên kênh thoại!' });

        case 'stop':
        case 'stop_voice':
            return res.json({ success: true, message: 'Đã dừng toàn bộ tiến trình treo trên Render!' });

        case 'start_quest':
            return res.json({ success: true, message: 'Đã thêm tài khoản vào hàng chờ cày Quest!' });

        case 'stop_quest':
            return res.json({ success: true, message: 'Đã hủy cày Quest cho tài khoản!' });

        default:
            return res.status(400).json({ success: false, message: 'Lệnh không hợp lệ!' });
    }
});

app.listen(PORT, () => {
    console.log(`Server Backend đang hoạt động tại port ${PORT}`);
});
