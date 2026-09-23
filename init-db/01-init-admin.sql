-- Initialize Smiluster Database
-- This script creates the default admin user and license

USE smiluster;

-- Create default license (expires in 1 year from now)
INSERT INTO Licenses (expirationDate, licenseKey) VALUES
(DATE_ADD(NOW(), INTERVAL 1 YEAR), "SMILUSTER-DEFAULT-LICENSE-2025");

-- Get the license ID (will be 1 if this is the first insert)
SET @license_id = LAST_INSERT_ID();

-- Create default admin user
-- Email: admin@smiluster.com
-- Password: smiluster
INSERT INTO Users (email, password, firstName, lastName, phone, role, licenseID) VALUES
("admin@smiluster.com", "$2b$10$d0mLPy4UiFSDpxsgjTwgeOuC7lomIpLA8EhJ2DEhU4Aq014hC7Tce", "Admin", "User", 1234567890, "Doctor", @license_id);

-- Create default settings for the license
INSERT INTO Settings (
	licenseID,
	notificationPreferences,
	worksHours,
	sessionPeriod,
	holidays,
	allowReminderSMS,
	smsReminderMassage
) VALUES (
	@license_id,
	TRUE,
	"[{\"day\": 1, \"startTime\": \"09:00\", \"endTime\": \"18:00\"}, {\"day\": 2, \"startTime\": \"09:00\", \"endTime\": \"18:00\"}, {\"day\": 3, \"startTime\": \"09:00\", \"endTime\": \"18:00\"}, {\"day\": 4, \"startTime\": \"09:00\", \"endTime\": \"18:00\"}, {\"day\": 5, \"startTime\": \"09:00\", \"endTime\": \"18:00\"}]",
	"30",
	"[]",
	FALSE,
	""
);
