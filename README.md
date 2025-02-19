# sumo-apps-to-csv

This tool pulls the apps library from the Sumo API, creates a CSV, and downloads all associated icons.

## Configuration

| Config setting | Required | Description |
|----------------|----------|-------------|
| `SUMO_API_ACCESS_ID` | Yes | [Sumo API Docs](https://api.sumologic.com/docs/#section/Getting-Started/Authentication) |
| `SUMO_API_ACCESS_KEY` | Yes | [Sumo Help Docs](https://help.sumologic.com/docs/manage/security/access-keys/) |
| `SUMO_API_URL` | | Default: ` https://api.sumologic.com/api/ `<br>[Sumo Help Docs](https://help.sumologic.com/docs/manage/security/access-keys/) |
| `OUTPUT_PATH` | | Default: `${PWD}/apps.csv` |

## Usage

Requirements: NodeJS + npm

```bash
# install
npm install

# pull apps list
npm start
```

The tool outputs `apps.csv` and the folder `images`, containing all app icons named in the `icon-[APPNAME].[ext]` format.
