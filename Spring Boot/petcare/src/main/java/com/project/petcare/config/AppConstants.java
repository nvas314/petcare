package com.project.petcare.config;

public class AppConstants {
    public static final class User{
        public enum UserRole{
            ADMIN,
            APPROVER,
            MANAGER,
            COMMON
        }
        public enum UserStatus{
            ACTIVE,
            TIMEOUT
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
            ADOPTION
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
            COMMON
        }
    }
    public static final class Notification{
        public enum NotificationTypes{
            EMERGENCY,
            INFO
        }
    }
}
