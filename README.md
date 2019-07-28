# ChatSpace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|name|string|null: false|
### Association
- has_many :message
- has_many :group
- has_many :group_users

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :message
- has_many :group_users
- has_many  :users through::group_users

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|body|text| |
|image|string| |
|user_id|integer|null :false, foreign_key :true|
|group_id|integer|null :false, foreign_key :true|
### Association
- belongs_to :users
- belongs_to :group

## group_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer| null :false, foreign_key :true |
|group_id|integer| null :false, foreign_key :true|
### Association
- belongs_to :users
- belongs_to :group