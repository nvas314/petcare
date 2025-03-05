package com.project.petcare.config;

public class AppConstants {
    public static final class User{
        public enum UserRole{
            ADMIN,
            APROVER,
            MANAGER,
            COMMON
        }
        public enum UserStatus{
            ACTIVE,
            TIMEOUT,
            BANNED,
            DELETED
        }
    }
    public static final class Post{
        public enum PostType{
            LOST,
            FOUND
        }
        public enum  PostStatus{
            MISSING,
            RETURNED,
            EMERGENCY,
            ADOPTED
        }
        public enum  AnimalHolder{
            COMMON,
            VET,
            INSTITUTION
        }
    }
    public static final class InstOfficial{
        public enum InstOfficialType{
            APPLICATION,
            COMMON,
            MANAGER //Can invite other employees
        }
    }
    public static final class Notification{
        public enum NotificationTypes{
            EMERGENCY,
            INFO
        }
    }
}
