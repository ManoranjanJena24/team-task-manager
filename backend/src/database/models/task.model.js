const { DataTypes } = require("sequelize");

const sequelize = require("../../config/database");

const TASK_STATUS = require("../../common/constants/task-status");

const TASK_PRIORITY = require("../../common/constants/task-priority");

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.UUID,

      defaultValue: DataTypes.UUIDV4,

      primaryKey: true,
    },

    organizationId: {
      type: DataTypes.UUID,

      allowNull: false,

      field: "organization_id",
    },

    projectId: {
      type: DataTypes.UUID,

      allowNull: false,

      field: "project_id",
    },

    title: {
      type: DataTypes.STRING,

      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,

      allowNull: true,
    },

    priority: {
      type: DataTypes.ENUM(
        TASK_PRIORITY.LOW,
        TASK_PRIORITY.MEDIUM,
        TASK_PRIORITY.HIGH,
      ),

      allowNull: false,

      defaultValue: TASK_PRIORITY.MEDIUM,
    },

    status: {
      type: DataTypes.ENUM(
        TASK_STATUS.TODO,
        TASK_STATUS.IN_PROGRESS,
        TASK_STATUS.IN_REVIEW,
        TASK_STATUS.DONE,
        TASK_STATUS.BLOCKED,
      ),

      allowNull: false,

      defaultValue: TASK_STATUS.TODO,
    },

    assigneeId: {
      type: DataTypes.UUID,

      allowNull: false,

      field: "assignee_id",
    },

    createdBy: {
      type: DataTypes.UUID,

      allowNull: false,

      field: "created_by",
    },

    dueDate: {
      type: DataTypes.DATE,

      allowNull: false,

      field: "due_date",
    },

    completedAt: {
      type: DataTypes.DATE,

      allowNull: true,

      field: "completed_at",
    },
  },
  {
    tableName: "tasks",

    timestamps: true,

    underscored: true,
  },
);

module.exports = Task;
