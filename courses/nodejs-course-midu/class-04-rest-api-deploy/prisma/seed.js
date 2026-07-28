import movies from "../local/movies.json" with { type: "json" };

import { prisma } from "../lib/prisma.js";

await prisma.movie.deleteMany();
await prisma.genre.deleteMany();

async function main() {
  for (const movie of movies) {
    const genres = [];

    for (const genreName of movie.genre) {
      const genre = await prisma.genre.upsert({
        where: {
          name: genreName,
        },
        update: {},
        create: {
          name: genreName,
        },
      });

      genres.push({
        id: genre.id,
      });
    }

    await prisma.movie.create({
      data: {
        title: movie.title,
        year: movie.year,
        director: movie.director,
        duration: movie.duration,
        poster: movie.poster,
        rate: movie.rate,

        genres: {
          connect: genres,
        },
      },
    });
  }
}

main()
  .then(async () => {
    console.log("Seed completado");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
