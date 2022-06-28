package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabGames;

import java.util.List;

@Repository
public interface GabGamesRepo extends JpaRepository<GabGames, Integer> {

    @Query(value = "SELECT * FROM gab_games WHERE classification = :classification and status = 'ACTIVE' ORDER BY name ASC",nativeQuery = true)
    List<GabGames> findByClassification(String classification);

    @Query(value = "SELECT * FROM gab_games WHERE CODE = :sports",nativeQuery = true)
    GabGames findByCode(String sports);
}
