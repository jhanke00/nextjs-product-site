# DevOps

Documentation on any DevOps changes made.

## Continuous Integration and Deployment (CI/CD)

### GitHub Actions Workflow

- **Update Workflow:**
  - Modify the existing GitHub Actions workflow to include steps for:
    - Building and deploying the updated backend API that handles recommendations.
    - (Optional) Deploying the database changes if a database is used for storing viewed products.

### Environment Variables

- **Gemini API Key:**
  - Add a secure environment variable to store the API key for the Google Gemini API.
  - Ensure the environment variable is accessible to the backend API during deployment.
