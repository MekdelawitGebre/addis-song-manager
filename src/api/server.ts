import { createServer, Model, Factory, Response } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,
    models: {
      song: Model,
    },
    factories: {
      song: Factory.extend({
        title(i) {
          return `Song ${i + 1}`;
        },
        artist(i) {
          return `Artist ${i + 1}`;
        },
        album(i) {
          return `Album ${i + 1}`;
        },
        year() {
          return 2000 + Math.floor(Math.random() * 24);
        },
      }),
    },
    seeds(server) {
      server.createList("song", 25);
    },
    routes() {
      this.namespace = "api";
      this.get("/songs", (schema, request) => {
        let page = Number(request.queryParams.page) || 1;
        let limit = Number(request.queryParams.limit) || 5;
        let allSongs = schema.all("song").models;
        let total = allSongs.length;
        let start = (page - 1) * limit;
        let end = start + limit;
        let songs = allSongs.slice(start, end);
        return { songs, total };
      });
      this.post("/songs", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        attrs.year = Number(attrs.year);
        return schema.create("song", attrs);
      });
      this.put("/songs/:id", (schema, request) => {
        let id = String(request.params.id);
        let attrs = JSON.parse(request.requestBody);
        attrs.year = Number(attrs.year);
        let song = schema.find("song", id);
        if (song) {
          song.update(attrs);
          return song.attrs; 
        }
        return new Response(404);
      });
      this.delete("/songs/:id", (schema, request) => {
        let id = String(request.params.id);
        let song = schema.find("song", id);
        if (song) {
          song.destroy();
          return new Response(204);
        }
        return new Response(404);
      });
    },
  });
}
