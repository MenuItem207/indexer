# Indexer

Indexer is a CLI for managing translations

## Installation

Use git to install indexer. Make sure to clone it within the project directory so it should be the same level as package.json.

```bash
git clone https://github.com/MenuItem207/indexer.git
```

## Usage

```bash
# cd into indexer
cd indexer

npm start add "New Translation"
```

## Legacy
To convert a javascript object into the relevant json file, you need to update the env.js file and run
```bash
npm start merge-legacy
```