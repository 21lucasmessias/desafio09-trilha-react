import { Grid, AutoSizer, GridCellProps } from 'react-virtualized'
import { MovieCard } from "./MovieCard";

interface ContentProps {
  selectedGenre: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  };

  movies: Array<{
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }>;
}

export function Content({ selectedGenre, movies }: ContentProps) {

  const cellRender = ({ key, columnIndex, rowIndex, style }: GridCellProps) => {
    if (movies.length <= columnIndex + rowIndex * 3) {
      return <div key={key} style={style}></div>
    }
    return (
      <div key={key} style={style}>
        <MovieCard
          title={movies[columnIndex + rowIndex * 3].Title}
          poster={movies[columnIndex + rowIndex * 3].Poster}
          runtime={movies[columnIndex + rowIndex * 3].Runtime}
          rating={movies[columnIndex + rowIndex * 3].Ratings[0].Value}
        />
      </div>
    )
  }

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          <AutoSizer>
            {({ width, height }) => (
              <Grid
                width={width}
                height={height}
                columnCount={3}
                rowCount={Math.ceil(movies.length / 3)}
                columnWidth={width / 3}
                rowHeight={350}
                cellRenderer={cellRender}
                style={{ overflowX: 'hidden' }}
              />
            )}
          </AutoSizer>
        </div>
      </main>
    </div>
  )
}