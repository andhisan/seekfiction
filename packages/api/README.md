# About API directory

This directory contains Cloud Functions for Firebase files.

## Dependencies

<https://www.npmjs.com/package/@sasigume/seekfiction-commons>

## About exported_for_local_development

`exported_for_local_development` stores downloaded firestore data.

Run `yarn api:firestore:sync` from root to download files.

## About config

Before deploying on GitHub Actions, you **have to set functions config as repository secrets!**

```yml
      # Somehow we still need to set function config via GitHub secret
      # Detail: https://github.com/w9jds/firebase-action/issues/86
      - name: Set configs for Firebase ✅
        uses: w9jds/firebase-action@master
        with:
          args: functions:config:set ${{ secrets.FIREBASE_FUNCTIONS_ENV_VARIABLES }}
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

**For local, use `functions:config:get > .runtimeconfig.json`
