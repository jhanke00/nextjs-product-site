# Project Setup and Running with Docker

## Prerequisites

Ensure you have the following installed:

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Setup

1 - Clone the repository with `git clone` or fork the repository.

2 - Start the Docker containers with:
`docker compose -f infra/products/docker-compose.yml up --build`.

3 - Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Running SonarQube for Code Analysis

## Prerequisites

To analyze the code with SonarQube, ensure that SonarQube is running on an accessible server, such as an EC2 instance.

Follow the instructions in this guide for installation and configuration: [Install SonarQube and Sonar Scanner in a TypeScript Project](https://medium.com/@phbotelho/install-sonarqube-sonar-scanner-docker-in-atypescript-project-133ad5c0daa0). After setting it up, obtain the credentials required for the scanner.

## Configuration

1. **Save Credentials:**
   Add the SonarQube credentials to your `.env` file, ensuring they are available for authentication.

2. **Run the Sonar Scanner:**
   Decide how frequently you want to run the scanner, like:

   - **On each commit:** Configure a Git hook to trigger the scanner on every commit.
   - **On each merge:** Set up the scanner to run as part of your CI/CD pipeline for every merge.
   - **Another way:**

3. **Quality Gate (Optional):**
   Configure a "Quality Gate" in SonarQube to enforce a minimum code quality threshold. If the code does not meet the threshold, the deployment can be blocked.

   The configuration needed to enforce code quality standards is in the `sonar-project.properties` file. You can adjust the settings as needed to fit your project requirements.
