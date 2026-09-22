const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Starting migration from JSON to SQLite...");

  // 1. Migrate Users
  const dbPath = path.join(__dirname, 'data', 'db.json');
  if (fs.existsSync(dbPath)) {
    const rawData = fs.readFileSync(dbPath, 'utf8');
    const users = JSON.parse(rawData).users || [];
    
    for (const u of users) {
      await prisma.user.upsert({
        where: { username: u.username },
        update: {
          fullName: u.fullName,
          password: u.password,
          role: u.role,
          kelas: u.kelas,
          isActive: u.isActive !== false,
        },
        create: {
          id: u.id || undefined,
          username: u.username,
          fullName: u.fullName,
          password: u.password,
          role: u.role,
          kelas: u.kelas,
          isActive: u.isActive !== false,
        }
      });
    }
    console.log(`Migrated ${users.length} users.`);
  }

  // 2. Migrate Scores
  const scoresPath = path.join(__dirname, 'data', 'scores.json');
  if (fs.existsSync(scoresPath)) {
    const rawScores = fs.readFileSync(scoresPath, 'utf8');
    const scores = JSON.parse(rawScores) || [];
    
    let count = 0;
    for (const s of scores) {
      const user = await prisma.user.findUnique({ where: { username: s.username }});
      if (user) {
        await prisma.score.upsert({
          where: {
            username_materiId: {
              username: s.username,
              materiId: s.materiId
            }
          },
          update: {
            score: s.score,
            timestamp: s.timestamp ? new Date(s.timestamp) : new Date()
          },
          create: {
            userId: user.id,
            username: s.username,
            materiId: s.materiId,
            score: s.score,
            timestamp: s.timestamp ? new Date(s.timestamp) : new Date()
          }
        });
        count++;
      }
    }
    console.log(`Migrated ${count} scores.`);
  }

  // 3. Migrate Announcement
  const annPath = path.join(__dirname, 'data', 'announcement.json');
  if (fs.existsSync(annPath)) {
    const rawAnn = fs.readFileSync(annPath, 'utf8');
    const ann = JSON.parse(rawAnn) || {};
    
    await prisma.announcement.upsert({
      where: { id: 1 },
      update: {
        message: ann.message || '',
        active: ann.active === true,
        timestamp: ann.timestamp ? new Date(ann.timestamp) : new Date()
      },
      create: {
        id: 1,
        message: ann.message || '',
        active: ann.active === true,
        timestamp: ann.timestamp ? new Date(ann.timestamp) : new Date()
      }
    });
    console.log(`Migrated announcement.`);
  }

  console.log("Migration complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
