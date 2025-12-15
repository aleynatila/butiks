#!/bin/bash

# Butiks Backend Management Script
# Usage: ./manage.sh [start|stop|restart|status|logs]

SERVICE_NAME="butiks-api"
SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"
LOG_FILE="/var/log/${SERVICE_NAME}.log"

case "$1" in
    start)
        echo "Starting ${SERVICE_NAME}..."
        sudo systemctl start ${SERVICE_NAME}
        sudo systemctl status ${SERVICE_NAME}
        ;;
    
    stop)
        echo "Stopping ${SERVICE_NAME}..."
        sudo systemctl stop ${SERVICE_NAME}
        sudo systemctl status ${SERVICE_NAME}
        ;;
    
    restart)
        echo "Restarting ${SERVICE_NAME}..."
        sudo systemctl restart ${SERVICE_NAME}
        sudo systemctl status ${SERVICE_NAME}
        ;;
    
    status)
        sudo systemctl status ${SERVICE_NAME}
        ;;
    
    logs)
        if [ -f "$LOG_FILE" ]; then
            tail -f "$LOG_FILE"
        else
            sudo journalctl -u ${SERVICE_NAME} -f
        fi
        ;;
    
    enable)
        echo "Enabling ${SERVICE_NAME} to start on boot..."
        sudo systemctl enable ${SERVICE_NAME}
        ;;
    
    disable)
        echo "Disabling ${SERVICE_NAME} from starting on boot..."
        sudo systemctl disable ${SERVICE_NAME}
        ;;
    
    reload)
        echo "Reloading systemd daemon..."
        sudo systemctl daemon-reload
        echo "Done!"
        ;;
    
    install)
        echo "Installing ${SERVICE_NAME} service..."
        
        # Check if service file exists
        if [ ! -f "butiks-api.service" ]; then
            echo "Error: butiks-api.service file not found!"
            exit 1
        fi
        
        # Copy service file
        sudo cp butiks-api.service ${SERVICE_FILE}
        
        # Reload systemd
        sudo systemctl daemon-reload
        
        # Enable service
        sudo systemctl enable ${SERVICE_NAME}
        
        echo "Service installed successfully!"
        echo "Use './manage.sh start' to start the service"
        ;;
    
    uninstall)
        echo "Uninstalling ${SERVICE_NAME} service..."
        sudo systemctl stop ${SERVICE_NAME}
        sudo systemctl disable ${SERVICE_NAME}
        sudo rm -f ${SERVICE_FILE}
        sudo systemctl daemon-reload
        echo "Service uninstalled successfully!"
        ;;
    
    update)
        echo "Updating ${SERVICE_NAME}..."
        
        # Pull latest changes
        git pull
        
        # Install dependencies
        npm install --production
        
        # Restart service
        sudo systemctl restart ${SERVICE_NAME}
        
        echo "Update completed!"
        ;;
    
    health)
        echo "Checking ${SERVICE_NAME} health..."
        curl -s http://localhost:5000/health | jq .
        ;;
    
    *)
        echo "Usage: $0 {start|stop|restart|status|logs|enable|disable|reload|install|uninstall|update|health}"
        exit 1
        ;;
esac

exit 0
