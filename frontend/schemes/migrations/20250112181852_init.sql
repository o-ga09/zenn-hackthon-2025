-- +migrate Up
-- User Details table
-- マイグレーション用のDDL
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY COMMENT 'ID',
    version INT NOT NULL DEFAULT 0 COMMENT 'バージョン',
    create_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    update_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    delete_datetime DATETIME DEFAULT NULL COMMENT '削除日時'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='ユーザー';

CREATE TABLE user_details (
   id VARCHAR(255) PRIMARY KEY  COMMENT 'ID',
    user_id VARCHAR(255) NOT NULL COMMENT 'ユーザーID',
    name VARCHAR(255) NOT NULL COMMENT 'ユーザー名',
    display_name VARCHAR(255) NOT NULL COMMENT '表示名',
    uid VARCHAR(32) NOT NULL COMMENT 'FirebaseID',
    birthday DATE NOT NULL COMMENT '誕生日',
    gender INT NOT NULL COMMENT '性別',
    profile_url VARCHAR(255) NOT NULL COMMENT 'プロフィールURL',
    create_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    update_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    delete_datetime DATETIME DEFAULT NULL COMMENT '削除日時',
    UNIQUE KEY uk_uid (uid),
    CONSTRAINT fk_user_details_user_id FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='ユーザー詳細';

CREATE TABLE user_social_accounts (
   id VARCHAR(255) PRIMARY KEY  COMMENT 'ID',
    user_id VARCHAR(255) NOT NULL COMMENT 'ユーザーID',
    profile_url VARCHAR(255) NOT NULL COMMENT 'プロフィールURL',
    x_url VARCHAR(255) NOT NULL COMMENT 'XURL',
    instagram_url VARCHAR(255) NOT NULL COMMENT 'InstagramURL',
    facebook_url VARCHAR(255) NOT NULL COMMENT 'FacebookURL',
    youtube_url VARCHAR(255) NOT NULL COMMENT 'YouTubeURL',
    create_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    update_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    delete_datetime DATETIME DEFAULT NULL COMMENT '削除日時',
    CONSTRAINT fk_user_social_accounts_user_id FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='ユーザーソーシャルアカウント';

CREATE TABLE user_groups (
   id VARCHAR(255) PRIMARY KEY  COMMENT 'ID',
    user_id VARCHAR(255) NOT NULL COMMENT 'ユーザーID',
    group_id VARCHAR(255) NOT NULL COMMENT 'グループID',
    invited_user_id VARCHAR(255) NOT NULL COMMENT '招待者のユーザーID',
    create_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    update_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    delete_datetime DATETIME DEFAULT NULL COMMENT '削除日時',
    CONSTRAINT fk_user_groups_user_id FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_user_groups_invited_user_id FOREIGN KEY (invited_user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='ユーザーグループ';

CREATE TABLE user_relationships (
   id VARCHAR(255) PRIMARY KEY  COMMENT 'ID',
    user_id VARCHAR(255) NOT NULL COMMENT 'ユーザーID',
    follow_id VARCHAR(255) NOT NULL COMMENT 'フォロー対象のユーザーID',
    create_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    update_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    delete_datetime DATETIME DEFAULT NULL COMMENT '削除日時',
    CONSTRAINT fk_user_relationships_user_id FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_user_relationships_follow_id FOREIGN KEY (follow_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='フォロー';

CREATE TABLE travels (
   id VARCHAR(255)  PRIMARY KEY,
    create_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    update_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    delete_datetime DATETIME DEFAULT NULL COMMENT '削除日時',
    user_id VARCHAR(255) NOT NULL COMMENT 'ユーザーID',
    version INT NOT NULL DEFAULT 0 COMMENT 'バージョン',
    title VARCHAR(255) NOT NULL COMMENT '旅行タイトル',
    description VARCHAR(255) NOT NULL COMMENT '旅行の説明',
    start_date DATE NOT NULL COMMENT '旅行開始日',
    end_date DATE NOT NULL COMMENT '旅行終了日',
    shared_id VARCHAR(32) NOT NULL COMMENT '共有ID',
    thumbnail VARCHAR(255) NOT NULL COMMENT 'サムネイル画像URL',
    INDEX idx_user_id (user_id),
    INDEX idx_delete_datetime (delete_datetime),
    CONSTRAINT fk_travels_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='旅行';

CREATE TABLE memories (
   id VARCHAR(255)  PRIMARY KEY,
    create_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    update_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    delete_datetime DATETIME DEFAULT NULL COMMENT '削除日時',
    travel_id VARCHAR(255) NOT NULL COMMENT '旅行ID',
    photo_url VARCHAR(255) NOT NULL COMMENT '写真URL',
    description VARCHAR(255) NOT NULL COMMENT '記録内容',
    date DATETIME NOT NULL COMMENT '記録日',
    INDEX idx_travel_id (travel_id),
    INDEX idx_delete_datetime (delete_datetime),
    CONSTRAINT fk_memories_travel FOREIGN KEY (travel_id) REFERENCES travels(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='思い出';

CREATE TABLE locations (
   id VARCHAR(255)  PRIMARY KEY,
    create_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    update_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    delete_datetime DATETIME DEFAULT NULL COMMENT '削除日時',
    travel_id VARCHAR(255) NOT NULL COMMENT '旅行ID',
    latitude DECIMAL(10,7) NOT NULL COMMENT '緯度',
    longitude DECIMAL(10,7) NOT NULL COMMENT '経度',
    moving_way VARCHAR(50) NOT NULL COMMENT '移動手段',
    left_time DATETIME NOT NULL COMMENT '出発時間',
    arrived_time DATETIME NOT NULL COMMENT '到着時間',
    title VARCHAR(255) NOT NULL COMMENT 'タイトル',
    description VARCHAR(255) NOT NULL COMMENT '記録内容',
    thumbnail VARCHAR(255) NOT NULL COMMENT 'サムネイル画像URL',
    INDEX idx_travel_id (travel_id),
    INDEX idx_delete_datetime (delete_datetime),
    CONSTRAINT fk_locations_travel FOREIGN KEY (travel_id) REFERENCES travels(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='位置情報';

CREATE TABLE costs (
   id VARCHAR(255)  PRIMARY KEY,
    create_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    update_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    delete_datetime DATETIME DEFAULT NULL COMMENT '削除日時',
    travel_id VARCHAR(255) NOT NULL COMMENT '旅行ID',
    date DATETIME NOT NULL COMMENT '費用発生日',
    item VARCHAR(100) NOT NULL COMMENT '費用項目',
    description VARCHAR(255) NOT NULL COMMENT '費用説明',
    specify VARCHAR(50) NOT NULL COMMENT '費用分類',
    amount INT NOT NULL COMMENT '金額',
    INDEX idx_travel_id (travel_id),
    INDEX idx_delete_datetime (delete_datetime),
    CONSTRAINT fk_costs_travel FOREIGN KEY (travel_id) REFERENCES travels(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='費用';

-- +migrate Down
DROP TABLE `costs`;
DROP TABLE `locations`;
DROP TABLE `memories`;
DROP TABLE `travels`;
DROP TABLE `user_relationships`;
DROP TABLE `user_groups`;
DROP TABLE `user_social_accounts`;
DROP TABLE `user_details`;
DROP TABLE `users`;
