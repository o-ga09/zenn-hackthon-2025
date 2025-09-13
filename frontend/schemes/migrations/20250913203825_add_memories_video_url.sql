-- +migrate Up
ALTER TABLE memories 
ADD COLUMN video_url VARCHAR(255)  NULL COMMENT '動画のURL';

-- +migrate Down
ALTER TABLE memories
DROP COLUMN video_url;
