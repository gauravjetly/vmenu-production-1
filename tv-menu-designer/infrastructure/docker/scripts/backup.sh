#!/bin/sh

# Backup script for PostgreSQL database

BACKUP_DIR="/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DB_NAME="tv_menu_designer"
BACKUP_FILE="${BACKUP_DIR}/backup_${DB_NAME}_${TIMESTAMP}.sql.gz"

echo "Starting backup at $(date)"

# Create backup directory if it doesn't exist
mkdir -p ${BACKUP_DIR}

# Perform backup
pg_dump -h postgres -U postgres -d ${DB_NAME} | gzip > ${BACKUP_FILE}

if [ $? -eq 0 ]; then
    echo "Backup completed successfully: ${BACKUP_FILE}"
    
    # Keep only last 7 days of backups
    find ${BACKUP_DIR} -name "backup_${DB_NAME}_*.sql.gz" -mtime +7 -delete
    echo "Old backups cleaned up"
else
    echo "Backup failed!"
    exit 1
fi

echo "Backup process completed at $(date)"