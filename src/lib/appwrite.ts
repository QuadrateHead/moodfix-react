import { Client, TablesDB, ID, Query, type Models } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;

export const isAppwriteConfigured = Boolean(
  APPWRITE_ENDPOINT && PROJECT_ID && DATABASE_ID && TABLE_ID,
);

export const client = new Client();
if (APPWRITE_ENDPOINT) {
  client.setEndpoint(APPWRITE_ENDPOINT);
}
if (PROJECT_ID) {
  client.setProject(PROJECT_ID);
}

const tablesDB = isAppwriteConfigured ? new TablesDB(client) : null;

// Shape of a row in the "metrics" table
export interface MetricsRow extends Models.Row {
  searchTerm: string;
  count: number;
  movie_id: number;
  poster_url: string;
}

// Minimal shape of the movie object you pass in (from TMDB)
interface Movie {
  id: number;
  poster_path: string | null;
}

export const updateSearchCount = async (
  searchTerm: string,
  movie: Movie
): Promise<void> => {
  if (!isAppwriteConfigured || !tablesDB) {
    return;
  }

  try {
    // 1. Check if a row for this movie already exists by movie_id
    const result = await tablesDB.listRows<MetricsRow>({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.equal('movie_id', movie.id)],
    });

    // 2. If it exists, increment the count and update searchTerm
    if (result.rows.length > 0) {
      const row = result.rows[0];
      await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: row.$id,
        data: {
          count: row.count + 1,
          searchTerm,
        },
      });
    } else {
      // 3. If it doesn't exist, create a new row
      await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),
        data: {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTrendingMovies = async (): Promise<MetricsRow[]> => {
  if (!isAppwriteConfigured || !tablesDB) {
    return [];
  }

  try {
    const result = await tablesDB.listRows<MetricsRow>({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.limit(50), Query.orderDesc('count')],
    });

    // Group rows by movie_id and sum counts across existing duplicate records
    const aggregated = new Map<number, MetricsRow>();

    for (const row of result.rows) {
      if (aggregated.has(row.movie_id)) {
        const existing = aggregated.get(row.movie_id)!;
        existing.count += row.count;
      } else {
        aggregated.set(row.movie_id, { ...row });
      }
    }

    // Sort aggregated unique movies descending by count and take top 5
    return Array.from(aggregated.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  } catch (error) {
    console.error(error);
    return [];
  }
};