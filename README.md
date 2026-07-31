# Employee-Complaint-Management-System 

Department-based complaint management system developed during my internship at Mövenpick Hotel. Employees access complaints related to their department, update task status and monitor progress through a real-time dashboard connected to Supabase.

# Employee Complaint Management System – Mövenpick Hotel

## Overview

This project was developed during my internship at Mövenpick Hotel.

The application provides hotel employees with a dedicated dashboard to manage customer complaints according to their department.

The platform is directly connected to the Client Complaint Portal and receives all submitted complaints in real time through Supabase.

## Main Features

### Department-Based Authentication

Employees log in using credentials assigned to their department.

Supported departments:

- IT Department
- Front Office (FO)
- Housekeeping (HK)

After authentication, employees can only access complaints related to their own department.

### Automatic Complaint Filtering

The application automatically filters complaints according to the employee's department, ensuring that each team only sees relevant tasks.

### Real-Time Synchronization

All complaint data is synchronized with Supabase.

New complaints submitted by guests become available to employees without manual intervention.

### Task Management

Employees can:

- View complaint details
- Track complaint status
- Update task progress

### Remaining and Completed Tasks

The dashboard automatically separates complaints into two categories.

#### Remaining Tasks

Displays complaints that still require action.

#### Completed Tasks

Displays complaints that have already been resolved.

### Interactive Status Toggle

Employees can mark a complaint as completed using a sliding toggle button.

When activated:

- The complaint status is updated in Supabase.
- The complaint is automatically moved from the Remaining Tasks section to the Completed Tasks section.

### Pending Tasks Counter

A real-time counter displays the number of complaints that are still pending.

This allows employees to quickly monitor their current workload and identify unresolved issues.

### Dashboard Analytics

The dashboard includes visual analytics to help staff monitor complaint trends.

#### High-Risk Room Detection

A chart automatically identifies rooms that have generated more than three complaints within a 24-hour period.

This feature helps management:

- Detect recurring issues
- Identify problematic rooms
- Improve maintenance planning
- Enhance guest satisfaction

### Automatic Refresh

The dashboard refreshes automatically every few seconds to ensure employees always have access to the latest complaint information.

### Centralized Complaint Tracking

The platform creates a centralized workflow between guests and hotel departments, improving communication and operational efficiency.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Supabase
- Chart.js

## Skills Demonstrated

- Front-End Development
- Database Integration
- Authentication Systems
- Data Filtering
- Real-Time Synchronization
- Dashboard Development
- Data Visualization
- Complaint Analytics
- User Experience Design
- Workflow Automation

## Security Notice

Authentication credentials and database credentials have been removed from this public repository.

## Internship Project

Developed during a one-month internship at Mövenpick Hotel to improve internal complaint management processes, automate complaint tracking, and provide operational insights through real-time monitoring and analytics.

## Application Preview

<img width="747" height="672" alt="Capture d’écran 2026-07-31 110859" src="https://github.com/user-attachments/assets/942c458d-7273-490d-8d27-5a8b29563ccb" />
<img width="1905" height="912" alt="Capture d’écran 2026-07-31 190440" src="https://github.com/user-attachments/assets/2c86d073-0ab3-4c78-9ee9-57f46acc4777" />
<img width="1907" height="915" alt="Capture d’écran 2026-07-31 190545" src="https://github.com/user-attachments/assets/13b42447-5dcb-476d-972a-283955657374" />
<img width="1897" height="912" alt="Capture d’écran 2026-07-31 190512" src="https://github.com/user-attachments/assets/2f362f02-0df0-46b2-b823-e08442b8c6ba" />



