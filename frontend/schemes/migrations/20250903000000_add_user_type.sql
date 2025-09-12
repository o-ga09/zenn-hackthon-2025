-- +migrate Up
ALTER TABLE user_details 
ADD COLUMN user_type VARCHAR(36) NOT NULL DEFAULT '550e8400-e29b-41d4-a716-446655440001' COMMENT 'ユーザータイプ';

-- +migrate Down
ALTER TABLE user_details 
DROP COLUMN user_type;
