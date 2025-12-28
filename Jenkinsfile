pipeline{
    agent {
        docker{
            image "node:24.12.0-alpine3.23"
        }
        // dockerContainer "node:24.12.0-alpine3.23"
    };

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
                    }
                }
            }
        }
    }
}