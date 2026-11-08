const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const stories = [
    {
        id: '1',
        title: 'Bầu Trời Hồng',
        author: 'Tác giả ẩn danh',
        description: 'Một câu chuyện nhẹ nhàng.',
        views: 120
    },
    {
        id: '2',
        title: 'Ngày Nắng Đẹp',
        author: 'Tác giả ẩn danh',
        description: 'Những câu chuyện về thanh xuân.',
        views: 85
    }
];

app.get('/', (req, res) => {
    res.render('index', { stories });
});

app.get('/story/:id', (req, res) => {
    const story = stories.find(s => s.id === req.params.id);

    if (!story) return res.status(404).send('Không tìm thấy truyện');

    story.views++;

    res.render('story', { story });
});

app.get('/read/:id', (req, res) => {
    const story = stories.find(s => s.id === req.params.id);

    if (!story) return res.status(404).send('Không tìm thấy truyện');

    res.render('read', { story });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bo Ngu Ngon dang chay tai http://localhost:${PORT}`);
});


