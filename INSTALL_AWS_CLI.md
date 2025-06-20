# Installing AWS CLI on macOS

## Method 1: Using Homebrew (Recommended)

```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install AWS CLI
brew install awscli

# Verify installation
aws --version
```

## Method 2: Using the Official Installer

```bash
# Download the installer
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"

# Install
sudo installer -pkg AWSCLIV2.pkg -target /

# Clean up
rm AWSCLIV2.pkg

# Verify installation
aws --version
```

## Method 3: Using Python pip

```bash
# Install pip if needed
python3 -m pip install --upgrade pip

# Install AWS CLI
pip3 install awscli --upgrade --user

# Add to PATH (add this to ~/.zshrc or ~/.bash_profile)
export PATH=$PATH:$HOME/Library/Python/3.9/bin

# Reload shell
source ~/.zshrc

# Verify installation
aws --version
```

## After Installation

Once installed, configure it with:

```bash
aws configure
```

You'll be prompted for:
- AWS Access Key ID: (from your IAM user)
- AWS Secret Access Key: (from your IAM user)  
- Default region name: us-east-1
- Default output format: json