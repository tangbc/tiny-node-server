## tiny-node-server

⚖ A tiny, simple and easyuse static server by nodejs.


## Install

```
npm install @tangbc/tiny-node-server --save-dev
```

## Configuration

Just simply config `tinyNodeServer` in your `package.json`:

```bash
{
  "name": "xxx",
  "version": "xxx",
  "description": "xxx",
  "script": {
    # --- add this script ---
    "server": "node node_modules/@tangbc/tiny-node-server",
    # --- or use bin alias ---
    "server": "tinyserver"
  },
  "tinyNodeServer": {
    "port": 8088,
    "root": "./",
    "log": 2
  },
  "author": "xxx"
}
```

Then, just `npm run server`!


## Fields

Config tinyNodeServer fields:

**Field** | **Required** | **Description** |
:--- | :--- | :--- |
| root | ✓ | The base dir to serve. |
| port | * | Listen port, default is `8088`. |
| suffix | * | Output url suffix, default is `''`. |
| log | * | Is show request log, default is `2`, off to `1`. |

