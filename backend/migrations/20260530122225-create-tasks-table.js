"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "tasks",
      {
        id: {
          type: Sequelize.UUID,

          defaultValue: Sequelize.UUIDV4,

          primaryKey: true
        },

        organization_id: {
          type: Sequelize.UUID,

          allowNull: false,

          references: {
            model: "organizations",

            key: "id"
          },

          onDelete: "CASCADE"
        },

        project_id: {
          type: Sequelize.UUID,

          allowNull: false,

          references: {
            model: "projects",

            key: "id"
          },

          onDelete: "CASCADE"
        },

        title: {
          type: Sequelize.STRING,

          allowNull: false
        },

        description: {
          type: Sequelize.TEXT
        },

        priority: {
          type: Sequelize.ENUM(
            "LOW",
            "MEDIUM",
            "HIGH"
          ),

          allowNull: false,

          defaultValue: "MEDIUM"
        },

        status: {
          type: Sequelize.ENUM(
            "TODO",
            "IN_PROGRESS",
            "IN_REVIEW",
            "DONE",
            "BLOCKED"
          ),

          allowNull: false,

          defaultValue: "TODO"
        },

        assignee_id: {
          type: Sequelize.UUID,

          allowNull: false,

          references: {
            model: "users",

            key: "id"
          }
        },

        due_date: {
          type: Sequelize.DATE,

          allowNull: false
        },

        completed_at: {
          type: Sequelize.DATE
        },

        created_at: {
          allowNull: false,

          type: Sequelize.DATE
        },

        updated_at: {
          allowNull: false,

          type: Sequelize.DATE
        }
      }
    );

    await queryInterface.addIndex(
      "tasks",
      ["status"],
      {
        name:
          "idx_task_status"
      }
    );

    await queryInterface.addIndex(
      "tasks",
      ["assignee_id"],
      {
        name:
          "idx_task_assignee"
      }
    );

    await queryInterface.addIndex(
      "tasks",
      ["due_date"],
      {
        name:
          "idx_task_due_date"
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable(
      "tasks"
    );
  }
};