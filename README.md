# pi-kagi-search

A pi extension to search the web using Kagi Search.

## Installation

Install via npm:

```bash
$ pi install npm:pi-kagi-search
```

Or install from git:

```bash
$ pi install git:github.com/richardanaya/pi-kagi-search
```

## Configuration

Create a JSON file at `~/.pi/kagi-search.json` with your API key:

```json
{
  "kagiSearchApiKey": "your-api-key-here"
}
```

Replace `your-api-key-here` with your actual Kagi API key.

## Usage

This extension provides a `kagi_search` tool that can be used to perform web searches via the Kagi Search API.