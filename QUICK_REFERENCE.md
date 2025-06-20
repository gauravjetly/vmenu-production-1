# Vintiq Menus - Quick Reference

## 🌐 Access Points
- **Production**: https://vintiqmenus.com
- **GitHub**: https://github.com/gauravjetly/vmenu-production-1
- **AWS Console**: https://console.aws.amazon.com/ (Account: 820242943945)

## 🚀 Common Operations

### Deploy Changes
```bash
# Automatic: Push to main branch
git push origin main

# Manual: Force deployment
aws ecs update-service --cluster vintiq-cluster --service vintiq-backend-service --force-new-deployment --region us-east-1
```

### View Logs
```bash
# Recent logs
aws logs tail /ecs/vintiq-backend --since 5m --region us-east-1
aws logs tail /ecs/vintiq-frontend --since 5m --region us-east-1

# Follow logs
aws logs tail /ecs/vintiq-backend --follow --region us-east-1
```

### Check Service Health
```bash
# Service status
aws ecs describe-services --cluster vintiq-cluster --services vintiq-backend-service --region us-east-1

# Target health
curl http://vintiq-alb-976178116.us-east-1.elb.amazonaws.com/health
```

### Scale Services
```bash
# Scale up (4 tasks)
aws ecs update-service --cluster vintiq-cluster --service vintiq-backend-service --desired-count 4 --region us-east-1

# Scale down (1 task)
aws ecs update-service --cluster vintiq-cluster --service vintiq-backend-service --desired-count 1 --region us-east-1
```

## 🔧 Troubleshooting

### Service Won't Start
1. Check logs: `aws logs tail /ecs/vintiq-SERVICE --since 10m --region us-east-1`
2. Check task status: ECS Console → Cluster → Service → Tasks tab
3. Verify environment variables in Parameter Store

### Database Issues
1. Check connection: Tasks must be in private subnets
2. Verify security group allows port 5432 from ECS tasks
3. Check Parameter Store has correct connection string

### Cannot Access Website
1. Check Route 53 DNS propagation
2. Verify ALB target health
3. Check security groups allow HTTP/HTTPS

## 📞 Quick Contacts
- **AWS Region**: us-east-1
- **ECS Cluster**: vintiq-cluster
- **Database**: vintiq-postgres.*.rds.amazonaws.com
- **S3 Bucket**: vintiq-uploads-production

## 🆘 Emergency Procedures

### Rollback Deployment
```bash
# List task definition revisions
aws ecs list-task-definitions --family vintiq-backend-task --region us-east-1

# Update to previous version
aws ecs update-service --cluster vintiq-cluster --service vintiq-backend-service --task-definition vintiq-backend-task:3 --region us-east-1
```

### Stop All Services (Cost Saving)
```bash
# Set desired count to 0
aws ecs update-service --cluster vintiq-cluster --service vintiq-backend-service --desired-count 0 --region us-east-1
aws ecs update-service --cluster vintiq-cluster --service vintiq-frontend-service --desired-count 0 --region us-east-1
aws ecs update-service --cluster vintiq-cluster --service vintiq-websocket-service --desired-count 0 --region us-east-1
```

### Restart All Services
```bash
# Set desired count back to 2
aws ecs update-service --cluster vintiq-cluster --service vintiq-backend-service --desired-count 2 --region us-east-1
aws ecs update-service --cluster vintiq-cluster --service vintiq-frontend-service --desired-count 2 --region us-east-1
aws ecs update-service --cluster vintiq-cluster --service vintiq-websocket-service --desired-count 2 --region us-east-1
```