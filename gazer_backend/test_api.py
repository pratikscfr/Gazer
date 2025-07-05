#!/usr/bin/env python3
"""
Test script for Gazer Backend API
"""

import requests
import json

BASE_URL = "http://localhost:9000"

def test_health():
    """Test health check endpoint"""
    print("Testing health check...")
    response = requests.get(f"{BASE_URL}/api/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def test_get_phrases():
    """Test getting all phrases"""
    print("Testing get phrases...")
    response = requests.get(f"{BASE_URL}/api/phrases")
    print(f"Status: {response.status_code}")
    phrases = response.json()
    print(f"Found {len(phrases)} phrases")
    for phrase in phrases[:3]:  # Show first 3
        print(f"  - {phrase['text']} (ID: {phrase['id']})")
    print()

def test_add_phrase():
    """Test adding a new phrase"""
    print("Testing add phrase...")
    new_phrase = {
        "text": "Test phrase from API",
        "category": "test"
    }
    response = requests.post(
        f"{BASE_URL}/api/phrases",
        json=new_phrase,
        headers={"Content-Type": "application/json"}
    )
    print(f"Status: {response.status_code}")
    if response.status_code == 201:
        phrase = response.json()
        print(f"Added phrase: {phrase['text']} (ID: {phrase['id']})")
    else:
        print(f"Error: {response.json()}")
    print()

def test_speak():
    """Test speech endpoint"""
    print("Testing speech endpoint...")
    speech_data = {
        "text": "Hello, this is a test of the speech API"
    }
    response = requests.post(
        f"{BASE_URL}/api/speak",
        json=speech_data,
        headers={"Content-Type": "application/json"}
    )
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def main():
    """Run all tests"""
    print("=== Gazer Backend API Tests ===\n")
    
    try:
        test_health()
        test_get_phrases()
        test_add_phrase()
        test_speak()
        print("All tests completed!")
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the server. Make sure it's running on port 9000.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main() 