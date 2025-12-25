pipeline{
    agent any;

    stages{
        stage("Checkout Repository"){
            echo "Repository Checkout"
        }
    }
    post{
        success{
            echo "Pipeline successfull"
        }
        failure{
            echo "Pipeline failed"
        }
    }
}