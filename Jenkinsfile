pipeline{
    agent {
        docker {
            // image 'node:24.12.0-alpine3.23'
            image "node24-owasp:v1"
        }
    }


    tools{
        nodejs "nodejs-24.0.0"
    }

    options{
        skipDefaultCheckout true
        retry(5)
    }

    stages{
        stage("Checkout Code"){
            steps{
                checkout scm
            }
        }
        stage("Start Build"){
            parallel{
                stage("Frontend"){
                    stages{
                        stage("Install Dependencies"){
                            steps{
                                dir("./frontend"){
                                    cache(
                                        caches: [
                                            arbitraryFileCache(
                                                cacheName: 'frontend/node_modules', 
                                                cacheValidityDecidingFile: 'package-lock.json', 
                                                path: 'node_modules'
                                            )], 
                                        maxCacheSize: 200
                                    ) {
                                        sh "npm install --no-audit"
                                    }
                                }
                            }
                        }
                        stage("Audit Dependencies"){
                            steps{
                                dir("./frontend"){
                                    sh "npm audit --audit-level=high"
                                }
                            }
                        }
                        stage("OWASP Dependency-Check Vulnerabilities"){
                            agent {
                                docker {
                                    image 'node24-owasp'
                                }
                            }
                            steps{
                                dir("./frontend"){
                                    dependencyCheck additionalArguments: ''' 
                                        -o './'
                                        -s './'
                                        -f 'ALL' 
                                        --prettyPrint''', odcInstallation: 'owasp-12.1.8'

                                    dependencyCheckPublisher pattern: 'dependency-check-report.xml'
                                }
                            }
                        }
                    }
                }
                stage("Backend"){
                    stages{
                        stage("Install Dependencies"){
                            steps{
                                dir("./backend"){
                                    cache(
                                        caches: [
                                            arbitraryFileCache(
                                                cacheName: 'backend/node_modules', 
                                                cacheValidityDecidingFile: 'package-lock.json', 
                                                path: 'node_modules'
                                            )], 
                                        maxCacheSize: 200
                                    ) {
                                        sh "npm install --no-audit"
                                    }
                                }
                            }
                        }
                        stage("Audit Dependencies"){
                            steps{
                                dir("./backend"){
                                    sh "npm audit --audit-level=high"
                                }
                            }
                        }    
                        stage("OWASP Dependency-Check Vulnerabilities"){
                            // agent any
                            agent {
                                docker {
                                    image 'node24-owasp'
                                }
                            }
                            steps{
                                dir("./backend"){
                                    dependencyCheck additionalArguments: ''' 
                                        -o './'
                                        -s './'
                                        -f 'ALL' 
                                        --prettyPrint''', odcInstallation: 'owasp-12.1.8'

                                    dependencyCheckPublisher pattern: 'dependency-check-report.xml'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}