-- ユーザーデータ
INSERT INTO users (id, version) VALUES 
('01HGY5QX6ZQKZX5PE6S3YG9VNM', 1),
('01HGY5QX6ZQKZX5PE6S3YG9VNN', 1);

INSERT INTO user_details (id, user_id, name, display_name, uid, birthday, gender, profile_url) VALUES
('01HGY5QX6ZQKZX5PE6S3YG9VNP', '01HGY5QX6ZQKZX5PE6S3YG9VNM', '山田太郎', 'ヤマダタロウ', 'uid0000000000000000000000000001', '1990-01-01', 1, 'https://example.com/profile1.jpg'),
('01HGY5QX6ZQKZX5PE6S3YG9VNQ', '01HGY5QX6ZQKZX5PE6S3YG9VNN', '佐藤花子', 'サトウハナコ', 'uid0000000000000000000000000002', '1992-02-02', 2, 'https://example.com/profile2.jpg');

INSERT INTO user_social_accounts (id, user_id, profile_url, x_url, instagram_url, facebook_url, youtube_url) VALUES
('01HGY5QX6ZQKZX5PE6S3YG9VNR', '01HGY5QX6ZQKZX5PE6S3YG9VNM', 'http://example.com/profile1', 'https://twitter.com/user1', 'https://instagram.com/user1', 'https://facebook.com/user1', 'https://youtube.com/user1'),
('01HGY5QX6ZQKZX5PE6S3YG9VNS', '01HGY5QX6ZQKZX5PE6S3YG9VNN', 'http://example.com/profile2', 'https://twitter.com/user2', 'https://instagram.com/user2', 'https://facebook.com/user2', 'https://youtube.com/user2');

INSERT INTO user_groups (id, user_id, group_id, invited_user_id) VALUES
('01HGY5QX6ZQKZX5PE6S3YG9VNT', '01HGY5QX6ZQKZX5PE6S3YG9VNM', 'group1', '01HGY5QX6ZQKZX5PE6S3YG9VNN'),
('01HGY5QX6ZQKZX5PE6S3YG9VNU', '01HGY5QX6ZQKZX5PE6S3YG9VNN', 'group2', '01HGY5QX6ZQKZX5PE6S3YG9VNM');

INSERT INTO user_relationships (id, user_id, follow_id) VALUES
('01HGY5QX6ZQKZX5PE6S3YG9VNV', '01HGY5QX6ZQKZX5PE6S3YG9VNM', '01HGY5QX6ZQKZX5PE6S3YG9VNN'),
('01HGY5QX6ZQKZX5PE6S3YG9VNW', '01HGY5QX6ZQKZX5PE6S3YG9VNN', '01HGY5QX6ZQKZX5PE6S3YG9VNM');

-- 旅行データ
INSERT INTO travels (id, user_id, version, title, description, start_date, end_date, shared_id, thumbnail) VALUES
('01HGY5QX6ZQKZX5PE6S3YG9VNX', '01HGY5QX6ZQKZX5PE6S3YG9VNM', 1, '北海道旅行', '北海道を巡る旅', '2024-01-01', '2024-01-05', 'share1', 'https://example.com/hokkaido.jpg'),
('01HGY5QX6ZQKZX5PE6S3YG9VNY', '01HGY5QX6ZQKZX5PE6S3YG9VNN', 1, '沖縄旅行', '沖縄を巡る旅', '2024-02-01', '2024-02-05', 'share2', 'https://example.com/okinawa.jpg');

-- 思い出データ
INSERT INTO memories (id, travel_id, photo_url, description, date) VALUES
('01HGY5QX6ZQKZX5PE6S3YG9VNZ', '01HGY5QX6ZQKZX5PE6S3YG9VNX', 'https://example.com/photo1.jpg', '美味しいラーメンを食べた', '2024-01-01 12:00:00'),
('01HGY5QX6ZQKZX5PE6S3YG9VP0', '01HGY5QX6ZQKZX5PE6S3YG9VNX', 'https://example.com/photo2.jpg', '雪まつりに行った', '2024-01-02 15:00:00'),
('01HGY5QX6ZQKZX5PE6S3YG9VP1', '01HGY5QX6ZQKZX5PE6S3YG9VNY', 'https://example.com/photo3.jpg', '美しいビーチ', '2024-02-01 10:00:00'),
('01HGY5QX6ZQKZX5PE6S3YG9VP2', '01HGY5QX6ZQKZX5PE6S3YG9VNY', 'https://example.com/photo4.jpg', '海中散歩', '2024-02-02 14:00:00');

-- 位置情報データ
INSERT INTO locations (id, travel_id, latitude, longitude, moving_way, left_time, arrived_time, title, description, thumbnail) VALUES
('01HGY5QX6ZQKZX5PE6S3YG9VP3', '01HGY5QX6ZQKZX5PE6S3YG9VNX', 43.0621, 141.3544, '飛行機', '2024-01-01 09:00:00', '2024-01-01 11:00:00', '新千歳空港', '新千歳空港に到着', 'https://example.com/chitose.jpg'),
('01HGY5QX6ZQKZX5PE6S3YG9VP4', '01HGY5QX6ZQKZX5PE6S3YG9VNX', 43.0621, 141.3544, '電車', '2024-01-01 12:00:00', '2024-01-01 13:00:00', 'すすきの', 'すすきのに移動', 'https://example.com/susukino.jpg'),
('01HGY5QX6ZQKZX5PE6S3YG9VP5', '01HGY5QX6ZQKZX5PE6S3YG9VNY', 26.2124, 127.6809, '飛行機', '2024-02-01 08:00:00', '2024-02-01 10:00:00', '那覇空港', '那覇空港に到着', 'https://example.com/naha.jpg'),
('01HGY5QX6ZQKZX5PE6S3YG9VP6', '01HGY5QX6ZQKZX5PE6S3YG9VNY', 26.2124, 127.6809, 'バス', '2024-02-01 11:00:00', '2024-02-01 12:00:00', '美ら海水族館', '美ら海水族館に移動', 'https://example.com/churaumi.jpg');

-- 費用データ
INSERT INTO costs (id, travel_id, date, item, description, specify, amount) VALUES
('01HGY5QX6ZQKZX5PE6S3YG9VP7', '01HGY5QX6ZQKZX5PE6S3YG9VNX', '2024-01-01 10:00:00', '交通費', '飛行機代', '移動', 30000),
('01HGY5QX6ZQKZX5PE6S3YG9VP8', '01HGY5QX6ZQKZX5PE6S3YG9VNX', '2024-01-01 12:00:00', '食費', 'ラーメン', '食事', 1000),
('01HGY5QX6ZQKZX5PE6S3YG9VP9', '01HGY5QX6ZQKZX5PE6S3YG9VNY', '2024-02-01 09:00:00', '交通費', '飛行機代', '移動', 40000),
('01HGY5QX6ZQKZX5PE6S3YG9VPA', '01HGY5QX6ZQKZX5PE6S3YG9VNY', '2024-02-01 13:00:00', '観光', '水族館入場料', 'レジャー', 2000);

-- お知らせデータ
INSERT INTO announcements (id, slug, title, content, tag, icon, created_at, updated_at, version) VALUES
('01HGY5QX6ZQKZX5PE6S3YG9VNB', 'welcome', 'ようこそTaviNikkiへ', 'TaviNikkiへようこそ！旅行の思い出を記録し、共有しましょう。', 'info', '🎉', NOW(), NOW(), 1),
('01HGY5QX6ZQKZX5PE6S3YG9VNC', 'new-feature', '新機能のお知らせ', '新しい機能が追加されました。ぜひお試しください！', 'update', '🚀', NOW(), NOW(), 1);