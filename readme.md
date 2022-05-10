# CHALLENGE NODEJS CLICKSOFT

API developed for the NODEJS challenge proposed by Clicksoft.

API Developed using: Nodejs, TypeScript, Sqlite, AdonisJs and Lucid.

Resources available for access via API:
* [**Students**](reference/api/students)
* [**Teachers**](reference/api/teachers)


## Methods
Requests to the API must follow the standards:
| Method | Description |
|---|---|
| `GET` | Returns information from one or more records. |
| `POST` | Used to create a new record. |
| `PUT` | Update record data or change its status. |
| `DELETE` | Removes a system registry. |

## Answers
| Code | Description |
|---|---|
| `200` | Request executed successfully (success).|
| `400` | Validation errors or the entered fields do not exist in the system.|
| `401` | Invalid access data.|
| `404` | Searched record not found.|
| `405` | Method not implemented.|
| `410` | Searched record has been deleted from the system and is no longer available.|
| `422` | Data entered is outside the scope defined for the field.|
| `429` | Maximum number of requests reached. (*wait a few seconds and try again*)|

## Installation

1 - Clone the repository (git clone https://github.com/wagner477/desafio-node-clicksoft.git)

2 - Access the cloned repository folder

3 - Run the command (npm install or yarn install )

4 - run the command (node ​​ace migration:run) to create the database

5 - Run the command (npm run dev or yarn dev) to start the server

Ready now you can make your requests!!!

<center> Developed based on coffee and Js by Wagner ❤ </center>
