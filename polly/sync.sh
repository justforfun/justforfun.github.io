#!/bin/sh

AWS_DEFAULT_REGION=eu-west-1 aws s3 sync . s3://lambda-talk-example --exclude ".git/*" --exclude "sync.sh" --acl public-read

